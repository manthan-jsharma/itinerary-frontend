"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { PlusCircle, MinusCircle, Hotel, Compass, Car } from "lucide-react";

export default function CreateItineraryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    num_nights: "3",
    regions: "Phuket",
    days: [
      {
        day_number: 1,
        accommodation_id: "",
        activity_ids: [],
        transfer_ids: [],
      },
    ],
  });
  const accommodations = [
    {
      id: "1",
      name: "Phuket Marriott Resort & Spa",
      location: "Patong, Phuket",
    },
    { id: "2", name: "Kata Rocks", location: "Kata, Phuket" },
    {
      id: "3",
      name: "Hilton Phuket Arcadia Resort",
      location: "Karon, Phuket",
    },
    { id: "4", name: "Krabi Resort", location: "Ao Nang, Krabi" },
    {
      id: "5",
      name: "Railay Princess Resort & Spa",
      location: "Railay, Krabi",
    },
    {
      id: "6",
      name: "Phi Phi Island Village Beach Resort",
      location: "Phi Phi Islands",
    },
    { id: "7", name: "The Slate", location: "Phuket" },
    {
      id: "8",
      name: "Dusit Thani Krabi Beach Resort",
      location: "Krabi Town, Krabi",
    },
  ];

  const activities = [
    { id: "1", name: "Phi Phi Islands Tour", location: "Phi Phi Islands" },
    { id: "2", name: "Phang Nga Bay Tour", location: "Phuket" },
    { id: "3", name: "Patong Nightlife Tour", location: "Patong, Phuket" },
    { id: "4", name: "Four Islands Tour", location: "Ao Nang, Krabi" },
    { id: "5", name: "Rock Climbing in Railay", location: "Railay, Krabi" },
    { id: "6", name: "Elephant Sanctuary Visit", location: "Phuket" },
    { id: "7", name: "Thai Cooking Class", location: "Krabi Town, Krabi" },
    { id: "8", name: "Big Buddha Phuket", location: "Phuket" },
    { id: "9", name: "Tiger Cave Temple", location: "Krabi Town, Krabi" },
    { id: "10", name: "Similan Islands Snorkeling", location: "Phuket" },
  ];

  const transfers = [
    { id: "1", name: "Phuket Airport to Patong Beach", type: "Car" },
    { id: "2", name: "Phuket Airport to Kata Beach", type: "Car" },
    { id: "3", name: "Phuket Airport to Karon Beach", type: "Car" },
    { id: "4", name: "Krabi Airport to Ao Nang", type: "Car" },
    { id: "5", name: "Ao Nang to Railay Beach", type: "Longtail Boat" },
    { id: "6", name: "Krabi to Phi Phi Islands", type: "Ferry" },
    { id: "7", name: "Phuket to Phi Phi Islands", type: "Speedboat" },
    { id: "8", name: "Phuket to Krabi Town", type: "Car" },
  ];

  const handleAddDay = () => {
    const newDayNumber = formData.days.length + 1;
    setFormData({
      ...formData,
      days: [
        ...formData.days,
        {
          day_number: newDayNumber,
          accommodation_id: "",
          activity_ids: [],

          transfer_ids: [],
        },
      ],
    });
  };

  const handleRemoveDay = (index) => {
    if (formData.days.length <= 1) return;

    const updatedDays = formData.days.filter((_, i) => i !== index);
    updatedDays.forEach((day, i) => {
      day.day_number = i + 1;
    });

    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...formData.days];
    updatedDays[index][field] = value;
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleActivityToggle = (dayIndex, activityId) => {
    const updatedDays = [...formData.days];
    const currentActivities = updatedDays[dayIndex].activity_ids;

    if (currentActivities.includes(activityId)) {
      updatedDays[dayIndex].activity_ids = currentActivities.filter(
        (id) => id !== activityId
      );
    } else {
      updatedDays[dayIndex].activity_ids = [...currentActivities, activityId];
    }

    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleTransferToggle = (dayIndex, transferId) => {
    const updatedDays = [...formData.days];
    const currentTransfers = updatedDays[dayIndex].transfer_ids;

    if (currentTransfers.includes(transferId)) {
      updatedDays[dayIndex].transfer_ids = currentTransfers.filter(
        (id) => id !== transferId
      );
    } else {
      updatedDays[dayIndex].transfer_ids = [...currentTransfers, transferId];
    }

    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.num_nights || !formData.regions) {
      setLoading(false);
      return;
    }

    try {
      const apiUrl = "http://localhost:8000";

      // Convert string IDs to numbers for the API
      const payload = {
        ...formData,
        num_nights: Number.parseInt(formData.num_nights),
        days: formData.days.map((day) => ({
          ...day,
          accommodation_id: day.accommodation_id
            ? Number.parseInt(day.accommodation_id)
            : null,
          activity_ids: day.activity_ids.map((id) => Number.parseInt(id)),
          transfer_ids: day.transfer_ids.map((id) => Number.parseInt(id)),
        })),
      };

      const response = await fetch(`${apiUrl}/itineraries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create itinerary");
      }

      // Redirect to the new itinerary
      router.push(`/itineraries/${data.itinerary.id}`);
    } catch (error) {
      console.error("Error creating itinerary:", error);
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recommendations
            </Link>
            <Link href="/create" className="text-sm font-medium text-primary">
              Create
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Create New Itinerary</h1>
            <p className="text-muted-foreground">
              Design your custom Thailand travel itinerary
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the basic details for your itinerary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Itinerary Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Phuket Adventure"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your itinerary..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="num_nights">Number of Nights</Label>
                    <Select
                      value={formData.num_nights}
                      onValueChange={(value) =>
                        setFormData({ ...formData, num_nights: value })
                      }
                    >
                      <SelectTrigger id="num_nights">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 nights">2 nights</SelectItem>
                        <SelectItem value="3 nights">3 nights</SelectItem>
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
                        <SelectValue placeholder="Select regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Phuket">Phuket</SelectItem>
                        <SelectItem value="Krabi">Krabi</SelectItem>
                        <SelectItem value="Phi Phi">Phi Phi</SelectItem>
                        <SelectItem value="Phuket, Krabi">
                          Phuket & Krabi
                        </SelectItem>
                        <SelectItem value="Phuket, Krabi, Phi Phi">
                          Phuket, Krabi & Phi Phi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Day-by-Day Planning</h2>
                <Button
                  type="button"
                  onClick={handleAddDay}
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Day
                </Button>
              </div>

              {formData.days.map((day, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">
                      Day {day.day_number}
                    </CardTitle>
                    {formData.days.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveDay(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MinusCircle className="h-4 w-4" />
                        <span className="sr-only">Remove Day</span>
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Hotel className="mr-2 h-4 w-4" />
                        <Label htmlFor={`accommodation-${index}`}>
                          Accommodation
                        </Label>
                      </div>
                      <Select
                        value={day.accommodation_id}
                        onValueChange={(value) =>
                          handleDayChange(index, "accommodation_id", value)
                        }
                      >
                        <SelectTrigger id={`accommodation-${index}`}>
                          <SelectValue placeholder="Select accommodation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {accommodations.map((acc) => (
                            <SelectItem key={acc.id} value={acc.id}>
                              {acc.name} ({acc.location})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Compass className="mr-2 h-4 w-4" />
                        <Label>Activities</Label>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`activity-${index}-${activity.id}`}
                              checked={day.activity_ids.includes(activity.id)}
                              onChange={() =>
                                handleActivityToggle(index, activity.id)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                              htmlFor={`activity-${index}-${activity.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {activity.name} ({activity.location})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Car className="mr-2 h-4 w-4" />
                        <Label>Transfers</Label>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {transfers.map((transfer) => (
                          <div
                            key={transfer.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`transfer-${index}-${transfer.id}`}
                              checked={day.transfer_ids.includes(transfer.id)}
                              onChange={() =>
                                handleTransferToggle(index, transfer.id)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                              htmlFor={`transfer-${index}-${transfer.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {transfer.name} ({transfer.type})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/itineraries">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Itinerary"}
              </Button>
            </div>
          </form>
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
