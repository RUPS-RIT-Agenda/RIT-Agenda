"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "./calendar.css";

export default function Calendar({ user }) {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);

    useEffect(() => {
        if (user && user.studyCycle && user.schoolYear) {
            fetchEvents(user);
        }
    }, [user]);

    const fetchEvents = async (user) => {
        try {
            // Fetch course lessons and exercises
            const lessonsResponse = await fetch(
                `http://localhost:3001/api/course/lessons/${user.studyCycle}/${user.schoolYear}`
            );
            const lessons = lessonsResponse.ok ? await lessonsResponse.json() : [];

            const exercisesResponse = await fetch(
                `http://localhost:3001/api/course/exercises/${user.studyCycle}/${user.schoolYear}/${user.userGroup}`
            );
            const exercises = exercisesResponse.ok ? await exercisesResponse.json() : [];

            // Fetch custom events
            const customEventsResponse = await fetch(
                `http://localhost:3001/api/custom-event/${user._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const customEvents = customEventsResponse.ok ? await customEventsResponse.json() : [];
            console.log("Custom events", customEvents);


            const transformedEvents = [...lessons, ...exercises].flatMap((course) => {
                const events = [];
                let startDate = new Date(course.firstExecution);
                const endDate = new Date(course.lastExecution);

                const eventType =
                    course.type || (lessons.includes(course) ? "lesson" : "exercise");

                while (startDate <= endDate) {
                    const eventStart = new Date(startDate);
                    const eventEnd = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

                    events.push({
                        id: `${course._id}-${startDate.toISOString()}`,
                        title: `${course.name} - ${course.classroom || "No Classroom Specified"}`,
                        start: eventStart,
                        end: eventEnd,
                        allDay: false,
                        extendedProps: {
                            details: { ...course, type: eventType },
                            duration: `2 hours`,
                        },
                    });

                    startDate.setDate(startDate.getDate() + 7);
                }

                return events;
            });

            const transformedCustomEvents = customEvents.map((customEvent) => ({
                id: `custom-${customEvent._id}`,
                title: customEvent.name,
                start: new Date(customEvent.starttime),
                end: new Date(customEvent.endtime),
                location: customEvent.location,
                allDay: false,
                extendedProps: {
                    description: customEvent.description,
                    type: "custom",
                },
            }));

            setCurrentEvents([...transformedEvents, ...transformedCustomEvents]);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };



    const handleEventClick = (selected) => {
        const { details, duration } = selected.event.extendedProps;
        const clickedDate = formatDate(selected.event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        console.log("Selected event details:", details);

        setSelectedEvent({ ...details, clickedDate });
        setSelectedDuration(duration);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedEvent(null);
        setSelectedDuration(null);
    };

    const renderEventContent = (eventInfo) => {
        const details = eventInfo.event.extendedProps.details || {};
        const eventType = (details.type || eventInfo.event.extendedProps.type || "").trim();


        const isLesson = eventType === "lesson";
        const isExercise = eventType === "exercise" || eventType === "exercises";
        const isCustomEvent = eventType === "custom";


        const bgColorClass = isLesson
            ? "bg-blue-600"
            : isExercise
                ? "bg-teal-500"
                : isCustomEvent
                    ? "bg-blue-300"
                    : "bg-gray-500";

        const textColorClass = "text-white";

        return (
            <div
                className={`p-2 rounded-lg ${bgColorClass} ${textColorClass} h-full truncate shadow-md`}
                title={`${eventInfo.event.title} - ${eventInfo.timeText}`}
            >
                <strong>{eventInfo.event.title}</strong>
                <br />
                <span>{eventInfo.timeText}</span>
            </div>
        );
    };




    return (
        <div className="flex justify-center w-full gap-8">
            <div className="w-full mt-8 p-6 bg-white shadow-xl rounded-3xl">
                <FullCalendar
                    height="75vh"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay", 
                    }}
                    initialView="timeGridWeek"
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                    events={currentEvents}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                    }}
                />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white rounded-3xl p-8 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-gray-800">
                            Event Details
                        </DialogTitle>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-4 mt-4 text-left text-lg">
                            {selectedEvent.type === "lesson" || selectedEvent.type === "exercises" ? (
                                <>
                                    <p>
                                        <strong>Name:</strong> {selectedEvent.name}
                                    </p>
                                    <p>
                                        <strong>Type:</strong> {selectedEvent.type}
                                    </p>
                                    <p>
                                        <strong>Professor:</strong> {selectedEvent.professor}
                                    </p>
                                    <p>
                                        <strong>Classroom:</strong> {selectedEvent.classroom || "No Classroom Specified"}
                                    </p>
                                    <p>
                                        <strong>Date:</strong> {selectedEvent.clickedDate}
                                    </p>
                                    <p>
                                        <strong>Duration:</strong> {selectedDuration}
                                    </p>
                                </>
                            ) : selectedEvent.type === "custom" ? (
                                <>
                                    <p>
                                        <strong>Name:</strong> {selectedEvent.name}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {selectedEvent.description || "No description available"}
                                    </p>
                                    <p>
                                        <strong>Start Time:</strong> {new Date(selectedEvent.starttime).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>End Time:</strong> {new Date(selectedEvent.endtime).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Location:</strong> {selectedEvent.location || "No location specified"}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    )}


                    <button
                        className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
                        onClick={handleCloseDialog}
                    >
                        Close
                    </button>
                </DialogContent>
            </Dialog>


        </div>
    );
}