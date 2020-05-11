import React, { useState, useEffect } from "react";
import { Form, Button, Table } from 'react-bootstrap';
import API from "../utils/API"
import LookupForms from "../components/LookupForms";
import AppBar from "../components/AppBar"


export function Home() {
    return (
        <div>
            <AppBar />
            <br></br>
            <LookupForms />
        </div>

    );
}
