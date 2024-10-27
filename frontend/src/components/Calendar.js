"use client";

import React, { useState, useEffect } from "react";
import {
    formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Calendar (){
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedEvents = localStorage.getItem("events");
            if (savedEvents) {
                setCurrentEvents(JSON.parse(savedEvents));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("events", JSON.stringify(currentEvents));
        }
    }, [currentEvents]);

    const handleDateClick = (selected) => {
        setSelectedDate(selected);
        setIsDialogOpen(true);
    };

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)) {
            selected.event.remove();
            setCurrentEvents(currentEvents.filter(event => event.id !== selected.event.id));
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewEventTitle("");
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (newEventTitle && selectedDate) {
            const newEvent = {
                id: `${selectedDate.startStr}-${newEventTitle}`,
                title: newEventTitle,
                start: selectedDate.startStr,
                end: selectedDate.endStr,
                allDay: selectedDate.allDay,
            };

            setCurrentEvents([...currentEvents, newEvent]);
            handleCloseDialog();
        }
    };

    return (
        <div>
            <div className="flex w-full px-10 justify-start items-start gap-8">
                <div className="w-3/12">
                    <div className="py-10 text-2xl font-extrabold px-7">
                        Calendar Events
                    </div>
                    <ul className="space-y-4">
                        {currentEvents.length === 0 && (
                            <div className="italic text-center text-gray-400">
                                No Events Present
                            </div>
                        )}
                        {currentEvents.map((event) => (
                            <li
                                className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                                key={event.id}
                            >
                                {event.title}
                                <br />
                                <span className="text-slate-950">
                                    {formatDate(event.start, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-9/12 mt-8">
                    <FullCalendar
                        height="85vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={setCurrentEvents}
                        initialEvents={
                            typeof window !== "undefined"
                                ? JSON.parse(localStorage.getItem("events") || "[]")
                                : []
                        }
                    />
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Event Details</DialogTitle>
                    </DialogHeader>
                    <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            required
                            className="border border-gray-200 p-3 rounded-md text-lg"
                        />
                        <button
                            className="bg-green-500 text-white p-3 mt-5 rounded-md"
                            type="submit"
                        >
                            Add
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
