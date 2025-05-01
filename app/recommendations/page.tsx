"use client";

import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    numNights: "4",
    regions: "",
    budget: 1000,
    preferences: [],
  });

  const handlePreferenceChange = (preference) => {
    setFormData((prev) => {
      const currentPreferences = [...prev.preferences];
      if (currentPreferences.includes(preference)) {
        return {
          ...prev,
          preferences: currentPreferences.filter((p) => p !== preference),
        };
      } else {
        return {
          ...prev,
          preferences: [...currentPreferences, preference],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "http://localhost:8001";

      const response = await fetch(`${apiUrl}/recommend/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_nights: Number.parseInt(formData.numNights),
          regions: formData.regions || undefined,
          budget: formData.budget,
          preferences:
            formData.preferences.length > 0 ? formData.preferences : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to get recommendations");
      }

      setRecommendations(data.itineraries);
      setMessage(data.message);

      if (data.itineraries.length === 0) {
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);

      setRecommendations([]);
      setMessage("Error getting recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Itineraries
            </Link>
            <Link
              href="/recommendations"
              className="text-sm font-medium text-primary"
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get Personalized Recommendations
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Tell us what you're looking for and we'll suggest the perfect
                  itinerary
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Your Travel Preferences</CardTitle>
                  <CardDescription>
                    Fill in your preferences to get personalized recommendations
                    from our MCP server
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="numNights">Number of Nights</Label>
                      <Select
                        value={formData.numNights}
                        onValueChange={(value) =>
                          setFormData({ ...formData, numNights: value })
                        }
                      >
                        <SelectTrigger id="numNights">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Select
                        value={formData.regions}
                        onValueChange={(value) =>
                          setFormData({ ...formData, regions: value })
                        }
                      >
                        <SelectTrigger id="regions">
                          <SelectValue placeholder="All regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All regions</SelectItem>
                          <SelectItem value="Phuket">Phuket</SelectItem>
                          <SelectItem value="Krabi">Krabi</SelectItem>
                          <SelectItem value="Phi Phi">Phi Phi</SelectItem>
                          <SelectItem value="Phuket, Krabi">
                            Phuket & Krabi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="budget">
                          Budget (up to ${formData.budget})
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          ${formData.budget}
                        </span>
                      </div>
                      <Slider
                        id="budget"
                        min={300}
                        max={2000}
                        step={50}
                        value={[formData.budget]}
                        onValueChange={(value) =>
                          setFormData({ ...formData, budget: value[0] })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Travel Preferences</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="beach"
                            checked={formData.preferences.includes("beach")}
                            onCheckedChange={() =>
                              handlePreferenceChange("beach")
                            }
                          />
                          <label
                            htmlFor="beach"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Beaches
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="adventure"
                            checked={formData.preferences.includes("adventure")}
                            onCheckedChange={() =>
                              handlePreferenceChange("adventure")
                            }
                          />
                          <label
                            htmlFor="adventure"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Adventure
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="luxury"
                            checked={formData.preferences.includes("luxury")}
                            onCheckedChange={() =>
                              handlePreferenceChange("luxury")
                            }
                          />
                          <label
                            htmlFor="luxury"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Luxury
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cultural"
                            checked={formData.preferences.includes("cultural")}
                            onCheckedChange={() =>
                              handlePreferenceChange("cultural")
                            }
                          />
                          <label
                            htmlFor="cultural"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Cultural
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="nightlife"
                            checked={formData.preferences.includes("nightlife")}
                            onCheckedChange={() =>
                              handlePreferenceChange("nightlife")
                            }
                          />
                          <label
                            htmlFor="nightlife"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Nightlife
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="family"
                            checked={formData.preferences.includes("family")}
                            onCheckedChange={() =>
                              handlePreferenceChange("family")
                            }
                          />
                          <label
                            htmlFor="family"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Family-friendly
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading
                        ? "Getting Recommendations..."
                        : "Get Recommendations"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {recommendations && (
              <div className="mt-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      Your Personalized Recommendations
                    </h2>
                    <p className="text-muted-foreground">{message}</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendations.length > 0 ? (
                    recommendations.map((itinerary) => (
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
                      <p className="text-muted-foreground">
                        No recommendations found. Try adjusting your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
