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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, DollarSign, ArrowRight, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

async function getItineraries(searchParams) {
  const apiUrl = process.env.API_URL || "http://localhost:8000";

  const page = searchParams.page || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  let url = `${apiUrl}/itineraries?skip=${skip}&limit=${limit}`;

  if (searchParams.nights) {
    url += `&num_nights=${searchParams.nights}`;
  }

  if (searchParams.regions) {
    url += `&regions=${searchParams.regions}`;
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch itineraries");
    return res.json();
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return { itineraries: [], total: 0 };
  }
}

export default async function ItinerariesPage({ searchParams }) {
  const { itineraries, total } = await getItineraries(searchParams);

  const currentPage = Number.parseInt(searchParams.page) || 1;
  const limit = 9;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary">Thailand</span>
            <span>Travel Planner</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/itineraries"
              className="text-sm font-medium text-primary"
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
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter">
                  All Itineraries
                </h1>
                <p className="text-muted-foreground">
                  Browse and discover travel plans for Thailand
                </p>
              </div>
              <Link href="/create">
                <Button>Create New Itinerary</Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nights">Number of Nights</Label>
                  <Select defaultValue={searchParams.nights || ""}>
                    <SelectTrigger id="nights">
                      <SelectValue placeholder="Any duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any duration</SelectItem>
                      <SelectItem value="2">2 nights</SelectItem>
                      <SelectItem value="3">3 nights</SelectItem>
                      <SelectItem value="4">4 nights</SelectItem>
                      <SelectItem value="5">5 nights</SelectItem>
                      <SelectItem value="7">7 nights</SelectItem>
                      <SelectItem value="8">8 nights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regions">Regions</Label>
                  <Select defaultValue={searchParams.regions || ""}>
                    <SelectTrigger id="regions">
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All regions</SelectItem>
                      <SelectItem value="Phuket">Phuket</SelectItem>
                      <SelectItem value="Krabi">Krabi</SelectItem>
                      <SelectItem value="Phi Phi">Phi Phi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">
                      No itineraries found
                    </p>
                  </div>
                )}
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/itineraries?page=${currentPage - 1}`}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={`/itineraries?page=${pageNumber}`}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href={`/itineraries?page=${currentPage + 1}`}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
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
