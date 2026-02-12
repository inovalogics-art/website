"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import type {
  CompanySettings,
  HeroSettings,
  AboutSettings,
  SocialSettings,
  CalendlySettings,
  BookingSettings,
} from "@/lib/types";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanySettings>({
    name: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
  });
  const [hero, setHero] = useState<HeroSettings>({
    title: "",
    subtitle: "",
    cta_primary: "",
    cta_secondary: "",
  });
  const [about, setAbout] = useState<AboutSettings>({
    title: "",
    description: "",
    years_experience: 0,
    projects_completed: 0,
    clients_worldwide: 0,
    team_members: 0,
  });
  const [social, setSocial] = useState<SocialSettings>({
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
  });
  const [calendly, setCalendly] = useState<CalendlySettings>({
    url: "",
    enabled: false,
  });
  const [booking, setBooking] = useState<BookingSettings>({
    duration_minutes: 30,
    buffer_minutes: 15,
    advance_days: 30,
    timezone: "America/New_York",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          if (data.data.company) setCompany(data.data.company);
          if (data.data.hero) setHero(data.data.hero);
          if (data.data.about) setAbout(data.data.about);
          if (data.data.social) setSocial(data.data.social);
          if (data.data.calendly) setCalendly(data.data.calendly);
          if (data.data.booking_settings) setBooking(data.data.booking_settings);
        }
        setLoading(false);
      });
  }, []);

  const saveSetting = async (key: string, value: unknown) => {
    setSaving(key);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <p className="text-muted-foreground">
          Manage your website content and configuration
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="calendly">Calendly</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Basic information about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={company.name}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={company.tagline}
                    onChange={(e) =>
                      setCompany({ ...company, tagline: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={company.email}
                    onChange={(e) =>
                      setCompany({ ...company, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={company.phone}
                    onChange={(e) =>
                      setCompany({ ...company, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={company.address}
                  onChange={(e) =>
                    setCompany({ ...company, address: e.target.value })
                  }
                  rows={2}
                />
              </div>
              <Button
                onClick={() => saveSetting("company", company)}
                disabled={saving === "company"}
              >
                {saving === "company" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Company Info
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Content for the main hero section of your homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Main Title</Label>
                <Input
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Textarea
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Primary CTA Text</Label>
                  <Input
                    value={hero.cta_primary}
                    onChange={(e) =>
                      setHero({ ...hero, cta_primary: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary CTA Text</Label>
                  <Input
                    value={hero.cta_secondary}
                    onChange={(e) =>
                      setHero({ ...hero, cta_secondary: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => saveSetting("hero", hero)}
                disabled={saving === "hero"}
              >
                {saving === "hero" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Hero Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>
                Content and statistics for the about section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={about.description}
                  onChange={(e) =>
                    setAbout({ ...about, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Years Experience</Label>
                  <Input
                    type="number"
                    value={about.years_experience}
                    onChange={(e) =>
                      setAbout({
                        ...about,
                        years_experience: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Projects Completed</Label>
                  <Input
                    type="number"
                    value={about.projects_completed}
                    onChange={(e) =>
                      setAbout({
                        ...about,
                        projects_completed: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Clients Worldwide</Label>
                  <Input
                    type="number"
                    value={about.clients_worldwide}
                    onChange={(e) =>
                      setAbout({
                        ...about,
                        clients_worldwide: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Team Members</Label>
                  <Input
                    type="number"
                    value={about.team_members}
                    onChange={(e) =>
                      setAbout({
                        ...about,
                        team_members: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => saveSetting("about", about)}
                disabled={saving === "about"}
              >
                {saving === "about" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save About Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Links to your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={social.linkedin}
                    onChange={(e) =>
                      setSocial({ ...social, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter / X</Label>
                  <Input
                    value={social.twitter}
                    onChange={(e) =>
                      setSocial({ ...social, twitter: e.target.value })
                    }
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input
                    value={social.facebook}
                    onChange={(e) =>
                      setSocial({ ...social, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={social.instagram}
                    onChange={(e) =>
                      setSocial({ ...social, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input
                    value={social.github}
                    onChange={(e) =>
                      setSocial({ ...social, github: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <Button
                onClick={() => saveSetting("social", social)}
                disabled={saving === "social"}
              >
                {saving === "social" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Social Links
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendly">
          <Card>
            <CardHeader>
              <CardTitle>Calendly Integration</CardTitle>
              <CardDescription>
                Connect your Calendly account for booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Calendly URL</Label>
                <Input
                  value={calendly.url}
                  onChange={(e) =>
                    setCalendly({ ...calendly, url: e.target.value })
                  }
                  placeholder="https://calendly.com/your-username"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="calendly_enabled"
                  checked={calendly.enabled}
                  onChange={(e) =>
                    setCalendly({ ...calendly, enabled: e.target.checked })
                  }
                  className="h-4 w-4"
                />
                <Label htmlFor="calendly_enabled">
                  Use Calendly instead of built-in booking
                </Label>
              </div>
              <Button
                onClick={() => saveSetting("calendly", calendly)}
                disabled={saving === "calendly"}
              >
                {saving === "calendly" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Calendly Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>
                Configure your built-in booking system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Meeting Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={booking.duration_minutes}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        duration_minutes: parseInt(e.target.value) || 30,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Buffer Between Meetings (minutes)</Label>
                  <Input
                    type="number"
                    value={booking.buffer_minutes}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        buffer_minutes: parseInt(e.target.value) || 15,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Advance Booking Days</Label>
                  <Input
                    type="number"
                    value={booking.advance_days}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        advance_days: parseInt(e.target.value) || 30,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Input
                    value={booking.timezone}
                    onChange={(e) =>
                      setBooking({ ...booking, timezone: e.target.value })
                    }
                    placeholder="America/New_York"
                  />
                </div>
              </div>
              <Button
                onClick={() => saveSetting("booking_settings", booking)}
                disabled={saving === "booking_settings"}
              >
                {saving === "booking_settings" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Booking Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
