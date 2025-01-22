import React, { useEffect, useState } from "react";
import { json } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
    .range(["#f6bcaf", "#d43518"]);

function World() {
    const [data, setData] = useState([]);

    useEffect(() => {
        /*json(`http://${process.env.REACT_APP_BACKEND_TRACK_URL}get_data_by_country`).then((data) => {
            setData(data);
            let maxValue = 0;
            for (const [key, value] of Object.entries(data)) {
                if (value.num_country > maxValue) {
                    maxValue = value.num_country;
                }
            }
            colorScale.domain([0, maxValue])
        });*/
    }, []);

    return (
        <div className="">
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    center: [0, 0],
                    scale: 90
                }}
                height={320}
            >
                <ZoomableGroup center={[0, 0]}>
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((s) => s.country_name_iso_2 === geo.id);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={d ? colorScale(d["num_country"]) : "#F5F4F6"}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}

export default World;