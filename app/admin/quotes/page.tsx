"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Trash2, Loader2 } from "lucide-react";
import type { QuoteRequest } from "@/lib/types";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500/10 text-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500/10 text-yellow-500" },
  { value: "in_progress", label: "In Progress", color: "bg-purple-500/10 text-purple-500" },
  { value: "converted", label: "Converted", color: "bg-green-500/10 text-green-500" },
  { value: "closed", label: "Closed", color: "bg-gray-500/10 text-gray-500" },
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const fetchQuotes = async () => {
    const res = await fetch("/api/admin/quotes");
    const data = await res.json();
    setQuotes(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleView = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setNotes(quote.notes || "");
    setDialogOpen(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    setSaving(true);
    await fetch("/api/admin/quotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchQuotes();
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setSaving(true);
    await fetch("/api/admin/quotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedQuote.id, notes }),
    });
    await fetchQuotes();
    setDialogOpen(false);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;

    await fetch(`/api/admin/quotes?id=${id}`, { method: "DELETE" });
    await fetchQuotes();
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
        <h2 className="text-2xl font-bold">Quote Requests</h2>
        <p className="text-muted-foreground">
          Manage incoming quote requests from potential clients
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {statusOptions.slice(0, 4).map((status) => {
          const count = quotes.filter((q) => q.status === status.value).length;
          return (
            <Card key={status.value}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => {
                const status = statusOptions.find((s) => s.value === quote.status);
                return (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.name}</TableCell>
                    <TableCell>{quote.email}</TableCell>
                    <TableCell>{quote.category?.name || "-"}</TableCell>
                    <TableCell>{quote.budget || "-"}</TableCell>
                    <TableCell>
                      <Select
                        value={quote.status}
                        onValueChange={(value) => handleStatusChange(quote.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue>
                            <span className={`px-2 py-1 rounded-full text-xs ${status?.color}`}>
                              {status?.label}
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(quote.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(quote)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(quote.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Quote Request Details</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedQuote.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedQuote.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedQuote.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedQuote.company || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedQuote.category?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">{selectedQuote.budget || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-medium">{selectedQuote.timeline || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedQuote.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Message</p>
                <p className="p-3 bg-muted rounded-lg text-sm">
                  {selectedQuote.message || "No message provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Admin Notes</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add internal notes about this quote..."
                />
              </div>
              <Button onClick={handleSaveNotes} disabled={saving} className="w-full">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Notes"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
