var BUBBLE_PARAMETERS = {
    "data_file": "incidents",
    //"report_title": "Largest Cities of the World",
    //"footer_text": "A demonstration of animated bubble charts in JavaScript and D3.js",
    "width": 1200,
    "height": 1000,
    "force_strength": 0.03,
    "force_type": "charge",
    "radius_field": 6,
    //"numeric_fields": ["Area", "Population", "Density"],
    "fill_color": {
        "data_field": "ticket_status",
        "color_groups": {
            "Open": "#d62728",
            "In-Progress": "#ff7f0e",
            "Closed": "#2ca02c"
        }
    },
    "tooltip": [
        {"title": "Ticket_Number", "data_field": "ticket_number"},
        {"title": "Severity", "data_field": "ticket_priority"},
        {"title": "Status", "data_field": "ticket_status"}
    ],
    "modes": [
        {
            "button_text": "All Tickets",
            "button_id": "all",
            "type": "grid",
            "labels": null,
            "grid_dimensions": {"rows": 1, "columns": 1},
            "data_field": null
        },
        {
            "button_text": "Categories",
            "button_id": "category_name",
            "type": "grid",
            "labels": ["Billing", "Policy", "Claims", "Rating"],
            "grid_dimensions": {"rows": 2, "columns": 3},
            "data_field": "category_name"
        },
        {
            "button_text": "Severity",
            "button_id": "ticket_priority",
            "type": "grid",
            "labels": ["Low", "Medium", "High"],
            "grid_dimensions": {"rows": 1, "columns": 3},
            "data_field": "ticket_priority"
        },
        {
            "button_text": "Status",
            "button_id": "ticket_status",
            "type": "grid",
            "labels": ["In-Progress","Open", "Closed"],
            "grid_dimensions": {"rows": 1, "columns": 3},
            "data_field": "ticket_status"
        },        {
            "button_text": "Solution Linked",
            "button_id": "solutionLinked",
            "type": "grid",
            "labels": ["Linked","NotLinked"],
            "grid_dimensions": {"rows": 1, "columns": 2},
            "data_field": "solutionLinked"
        }
    ]
};