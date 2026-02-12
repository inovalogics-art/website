"use client";

import React from "react"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus, Trash2, Loader2, Calendar } from "lucide-react";
import type { AvailableSlot, BlockedDate } from "@/lib/types";

const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [slotForm, setSlotForm] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "17:00",
    is_active: true,
  });
  const [blockForm, setBlockForm] = useState({
    date: "",
    reason: "",
  });

  const fetchData = async () => {
    const res = await fetch("/api/admin/slots");
    const data = await res.json();
    setSlots(data.slots || []);
    setBlockedDates(data.blockedDates || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "slot", ...slotForm }),
    });

    await fetchData();
    setSlotDialogOpen(false);
    setSlotForm({
      day_of_week: 1,
      start_time: "09:00",
      end_time: "17:00",
      is_active: true,
    });
    setSaving(false);
  };

  const handleToggleSlot = async (slot: AvailableSlot) => {
    await fetch("/api/admin/slots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: slot.id, is_active: !slot.is_active }),
    });
    await fetchData();
  };

  const handleDeleteSlot = async (id: string) => {
    if (!confirm("Are you sure you want to delete this time slot?")) return;

    await fetch(`/api/admin/slots?id=${id}&type=slot`, { method: "DELETE" });
    await fetchData();
  };

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "blocked_date", ...blockForm }),
    });

    await fetchData();
    setBlockDialogOpen(false);
    setBlockForm({ date: "", reason: "" });
    setSaving(false);
  };

  const handleDeleteBlockedDate = async (id: string) => {
    if (!confirm("Are you sure you want to remove this blocked date?")) return;

    await fetch(`/api/admin/slots?id=${id}&type=blocked_date`, { method: "DELETE" });
    await fetchData();
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
        <h2 className="text-2xl font-bold">Availability</h2>
        <p className="text-muted-foreground">
          Manage your available time slots and blocked dates
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Available Time Slots */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Schedule</CardTitle>
            <Dialog open={slotDialogOpen} onOpenChange={setSlotDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Time Slot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSlot} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <Select
                      value={slotForm.day_of_week.toString()}
                      onValueChange={(value) =>
                        setSlotForm({ ...slotForm, day_of_week: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day.value} value={day.value.toString()}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={slotForm.start_time}
                        onChange={(e) =>
                          setSlotForm({ ...slotForm, start_time: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={slotForm.end_time}
                        onChange={(e) =>
                          setSlotForm({ ...slotForm, end_time: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={slotForm.is_active}
                      onCheckedChange={(checked) =>
                        setSlotForm({ ...slotForm, is_active: checked })
                      }
                    />
                    <Label>Active</Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Time Slot"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">
                      {daysOfWeek.find((d) => d.value === slot.day_of_week)?.label}
                    </TableCell>
                    <TableCell>
                      {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={slot.is_active}
                        onCheckedChange={() => handleToggleSlot(slot)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Blocked Dates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Blocked Dates</CardTitle>
            <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Block Date
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Block a Date</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBlockedDate} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={blockForm.date}
                      onChange={(e) =>
                        setBlockForm({ ...blockForm, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reason (optional)</Label>
                    <Input
                      value={blockForm.reason}
                      onChange={(e) =>
                        setBlockForm({ ...blockForm, reason: e.target.value })
                      }
                      placeholder="e.g., Holiday, Vacation"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Blocking...
                      </>
                    ) : (
                      "Block Date"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {blockedDates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No blocked dates</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedDates.map((blocked) => (
                    <TableRow key={blocked.id}>
                      <TableCell className="font-medium">
                        {new Date(blocked.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{blocked.reason || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBlockedDate(blocked.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
