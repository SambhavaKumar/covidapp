import React, { useEffect, useState } from "react";
const Covid = () => {
    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [sortBy, setSortBy] = useState("Total");


    // get covid data
    const getCovidData = async () => {
        try {
            const resp = await fetch("https://data.covid19india.org/data.json");
            // console.log(resp);
            // json data store at new var using async
            const actualData = await resp.json();
            console.log(actualData.statewise);
            setData(actualData.statewise);
            if (
                Array.isArray(actualData.statewise) &&
                actualData.statewise.length > 0
            ) {
                setSelectedState(actualData.statewise[0]);
            }
          
            resp.json();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSort = () => {
        try {
            let tmpData = [];
            tmpData = data.find((r) => r.state === sortBy); // find return particular object of an array
            setSelectedState(tmpData);
        } catch (error) {
            console.log("Error in handleSort--", error);
        }
    };

    useEffect(() => {
        handleSort();
    }, [sortBy]);

    // init component
    useEffect(() => {
        getCovidData();
    }, []);
    return (
        <div className="container">
            <h1>LIVE UPDATES</h1>
            <h2>INDIA - COVID-19 CORONAVAIRUS TRACKER</h2>
            <div className="row">
                <div className="col-sm-6">
                    <select
                        className="form-control form-control-sm my-4"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                    >
                        {data.length > 0 &&
                            data.map((res, i) => (
                                <option key={i} value={res.state} id={res.state}>
                                    {res.state}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card" style={{ width: "18rem", background: "blue" }}>
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}></span>
                                State
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.state || ""}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div
                        className="card"
                        style={{ width: "18rem", background: "#34eba8" }}
                    >
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}>TOTAL</span>
                                RECOVERED
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.recovered || ""}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div
                        className="card"
                        style={{ width: "18rem", background: "#e8eb34" }}
                    >
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}>TOTAL</span>
                                CONFIRMED
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.confirmed || ""}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ paddingTop: "40px" }}>
                <div className="col-sm-4">
                    <div className="card" style={{ width: "18rem", background: "blue" }}>
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}>TOTAL</span>
                                DEATH
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.deaths || ""}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div
                        className="card"
                        style={{ width: "18rem", background: "#34eba8" }}
                    >
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}>TOTAL</span>
                                ACTIVE
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.active || ""}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div
                        className="card"
                        style={{ width: "18rem", background: "#e8eb34" }}
                    >
                        <div className="card-body">
                            <h3
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                <span style={{ color: "white", fontSize: "12px" }}>LAST</span>
                                UPDATED
                            </h3>
                            <h1
                                className="card-title"
                                style={{ color: "white", textAlign: "center" }}
                            >
                                {selectedState?.lastupdatedtime || ""}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Covid;
