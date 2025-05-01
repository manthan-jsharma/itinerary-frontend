import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  ArrowLeft,
  Hotel,
  Car,
  Plane,
  Compass,
} from "lucide-react";

async function getItinerary(id) {
  // In a real app, this would be an environment variable
  const apiUrl = process.env.API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiUrl}/itineraries/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch itinerary");
    return res.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return { itinerary: null };
  }
}

export default async function ItineraryPage({ params }) {
  const { itinerary } = await getItinerary(params.id);

  if (!itinerary) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Itinerary not found</h1>
        <p className="text-muted-foreground mt-2">
          The itinerary you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/itineraries" className="mt-4">
          <Button variant="outline">Back to Itineraries</Button>
        </Link>
      </div>
    );
  }

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
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <Link
                href="/itineraries"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Itineraries
              </Link>
              <h1 className="text-3xl font-bold">{itinerary.name}</h1>
              <p className="text-muted-foreground">{itinerary.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Share</Button>
              <Button>Book Now</Button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Regions</span>
                    </div>
                    <span className="font-medium">{itinerary.regions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Duration</span>
                    </div>
                    <span className="font-medium">
                      {itinerary.num_nights} nights
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Total Price</span>
                    </div>
                    <span className="font-medium">
                      ${itinerary.total_price.toFixed(2)}
                    </span>
                  </div>
                  {itinerary.is_recommended && (
                    <Badge className="w-full justify-center" variant="outline">
                      Recommended Itinerary
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Have questions about this itinerary?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="day-by-day">Day by Day</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Itinerary Overview</CardTitle>
                      <CardDescription>
                        A summary of your {itinerary.num_nights}-night journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Highlights</h3>
                        <ul className="list-disc pl-5 text-muted-foreground">
                          <li>
                            Explore the beautiful regions of {itinerary.regions}
                          </li>
                          <li>Stay in carefully selected accommodations</li>
                          <li>Experience the best activities and excursions</li>
                          <li>Convenient transfers between locations</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">What's Included</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <Hotel className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {itinerary.num_nights} nights accommodation
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">All transfers</span>
                          </div>
                          <div className="flex items-center">
                            <Compass className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Selected activities</span>
                          </div>
                          <div className="flex items-center">
                            <Plane className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">24/7 travel support</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="day-by-day" className="mt-4 space-y-4">
                  {itinerary.days &&
                    itinerary.days.map((day) => (
                      <Card key={day.day_number}>
                        <CardHeader className="pb-2">
                          <CardTitle>Day {day.day_number}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {day.accommodation && (
                            <div className="space-y-2">
                              <h3 className="font-medium flex items-center">
                                <Hotel className="mr-2 h-4 w-4" />
                                Accommodation
                              </h3>
                              <div className="rounded-lg border p-3">
                                <div className="font-medium">
                                  {day.accommodation.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {day.accommodation.description}
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                  <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                  <span>
                                    {day.accommodation.location.name},{" "}
                                    {day.accommodation.location.region}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {day.activities && day.activities.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="font-medium flex items-center">
                                <Compass className="mr-2 h-4 w-4" />
                                Activities
                              </h3>
                              <div className="space-y-2">
                                {day.activities.map((activity) => (
                                  <div
                                    key={activity.id}
                                    className="rounded-lg border p-3"
                                  >
                                    <div className="font-medium">
                                      {activity.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {activity.description}
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                      <div className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                        <span>{activity.location.name}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                        <span>
                                          {Math.floor(
                                            activity.duration_minutes / 60
                                          )}
                                          h {activity.duration_minutes % 60}m
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {day.transfers && day.transfers.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="font-medium flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                Transfers
                              </h3>
                              <div className="space-y-2">
                                {day.transfers.map((transfer) => (
                                  <div
                                    key={transfer.id}
                                    className="rounded-lg border p-3"
                                  >
                                    <div className="font-medium">
                                      {transfer.type} Transfer
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {transfer.description}
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                      <div className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                        <span>
                                          {transfer.from_location.name} to{" "}
                                          {transfer.to_location.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                        <span>
                                          {Math.floor(
                                            transfer.duration_minutes / 60
                                          )}
                                          h {transfer.duration_minutes % 60}m
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="map" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Itinerary Map</CardTitle>
                      <CardDescription>
                        Visual representation of your journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Map visualization would be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
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
