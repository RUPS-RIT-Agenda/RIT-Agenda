"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './page.css';

const LandingPage = () => {
    const [value, setValue] = useState(new Date());

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    return (
        <div className="container">
            <h1 className="centered-heading">RIT Agenda</h1>
            <Calendar value={value} onChange={setValue} className="calendar" />
            <h2 className="centered-heading">{formatDate(value)}</h2>
        </div>
    );
};

export default LandingPage;

