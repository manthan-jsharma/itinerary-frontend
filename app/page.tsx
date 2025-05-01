import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";

async function getItineraries() {
  const apiUrl = process.env.API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiUrl}/itineraries?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch itineraries");
    return res.json();
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return { itineraries: [], total: 0 };
  }
}

export default async function Home() {
  const { itineraries, total } = await getItineraries();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary">Thailand</span>
            <span>Travel Planner</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Home
            </Link>
            <Link
              href="/itineraries"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Itineraries
            </Link>
            <Link
              href="/recommendations"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recommendations
            </Link>
            <Link
              href="/create"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Create
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Discover Thailand's Beauty
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Plan your perfect trip to Thailand with our curated
                  itineraries featuring Phuket, Krabi, and more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/recommendations">
                  <Button size="lg">Get Recommendations</Button>
                </Link>
                <Link href="/itineraries">
                  <Button size="lg" variant="outline">
                    Browse Itineraries
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Itineraries
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our most popular travel plans for Thailand
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {itineraries && itineraries.length > 0 ? (
                itineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1">
                        {itinerary.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {itinerary.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-col space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 opacity-70" />
                          <span>{itinerary.regions}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 opacity-70" />
                          <span>{itinerary.num_nights} nights</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 opacity-70" />
                          <span>${itinerary.total_price.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={`/itineraries/${itinerary.id}`}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No itineraries found</p>
                </div>
              )}
            </div>
            {total > 6 && (
              <div className="flex justify-center mt-8">
                <Link href="/itineraries">
                  <Button variant="outline">View All Itineraries</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get Personalized Recommendations
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our intelligent system will suggest the perfect itinerary
                  based on your preferences
                </p>
              </div>
              <Link href="/recommendations">
                <Button size="lg" className="mt-4">
                  Find Your Perfect Trip
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2023 Thailand Travel Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
