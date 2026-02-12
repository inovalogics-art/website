"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Calendar,
  Briefcase,
  FolderKanban,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  quotes: { total: number; new: number };
  bookings: { total: number; pending: number; upcoming: number };
  categories: number;
  services: number;
  projects: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    created_at: string;
    category?: { name: string };
  }>>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Array<{
    id: string;
    name: string;
    email: string;
    scheduled_date: string;
    scheduled_time: string;
    status: string;
    category?: { name: string };
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quotesRes, bookingsRes, categoriesRes, servicesRes, projectsRes, testimonialsRes] = await Promise.all([
          fetch("/api/admin/quotes"),
          fetch("/api/admin/bookings"),
          fetch("/api/admin/categories"),
          fetch("/api/admin/services"),
          fetch("/api/admin/projects"),
          fetch("/api/admin/testimonials"),
        ]);

        const [quotesData, bookingsData, categoriesData, servicesData, projectsData, testimonialsData] = await Promise.all([
          quotesRes.json(),
          bookingsRes.json(),
          categoriesRes.json(),
          servicesRes.json(),
          projectsRes.json(),
          testimonialsRes.json(),
        ]);

        const quotes = quotesData.data || [];
        const bookings = bookingsData.data || [];
        const today = new Date().toISOString().split("T")[0];

        setStats({
          quotes: {
            total: quotes.length,
            new: quotes.filter((q: { status: string }) => q.status === "new").length,
          },
          bookings: {
            total: bookings.length,
            pending: bookings.filter((b: { status: string }) => b.status === "pending").length,
            upcoming: bookings.filter((b: { scheduled_date: string; status: string }) => 
              b.scheduled_date >= today && b.status !== "cancelled"
            ).length,
          },
          categories: (categoriesData.data || []).length,
          services: (servicesData.data || []).length,
          projects: (projectsData.data || []).length,
          testimonials: (testimonialsData.data || []).length,
        });

        setRecentQuotes(quotes.slice(0, 5));
        setUpcomingBookings(
          bookings
            .filter((b: { scheduled_date: string; status: string }) => 
              b.scheduled_date >= today && b.status !== "cancelled"
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Quote Requests",
      value: stats?.quotes.total || 0,
      subtitle: `${stats?.quotes.new || 0} new`,
      icon: FileText,
      href: "/admin/quotes",
      color: "text-blue-500",
    },
    {
      title: "Bookings",
      value: stats?.bookings.total || 0,
      subtitle: `${stats?.bookings.upcoming || 0} upcoming`,
      icon: Calendar,
      href: "/admin/bookings",
      color: "text-green-500",
    },
    {
      title: "Services",
      value: stats?.services || 0,
      subtitle: `${stats?.categories || 0} categories`,
      icon: Briefcase,
      href: "/admin/services",
      color: "text-purple-500",
    },
    {
      title: "Projects",
      value: stats?.projects || 0,
      subtitle: "Portfolio items",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Quotes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Quote Requests</CardTitle>
            <Link href="/admin/quotes" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <p className="text-muted-foreground text-sm">No quote requests yet</p>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{quote.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {quote.category?.name || "General"} - {quote.email}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        quote.status === "new"
                          ? "bg-blue-500/10 text-blue-500"
                          : quote.status === "contacted"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Consultations</CardTitle>
            <Link href="/admin/bookings" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <p className="text-muted-foreground text-sm">No upcoming bookings</p>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{booking.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.scheduled_date).toLocaleDateString()} at{" "}
                        {booking.scheduled_time.slice(0, 5)}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium">Manage Categories</span>
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Service</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <FolderKanban className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Project</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Site Settings</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
