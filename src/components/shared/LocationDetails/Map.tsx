// "use client";
// import React, { useRef, useEffect, useState } from "react";

// interface MarkerData {
//   position: { lat: number; lng: number };
//   name: string;
//   description: string;
// }

// // Extend the Window interface to include the google property and initMap function
// declare global {
//   interface Window {
//     google: any;
//     initMap: () => void;
//   }
// }

// interface MapProps {
//   onMarkerClick: (place: MarkerData | null) => void;
// }

// const Map: React.FC<MapProps> = ({ onMarkerClick }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const markersData: MarkerData[] = [
//     {
//       position: { lat: 26.771017645031975, lng: 85.9234104125973 },
//       name: "Janaki Mandir",
//       description: "A historic temple dedicated to Sita Devi.",
//     },
//     {
//       position: { lat: 26.730008050564077, lng: 85.92655558692753 },
//       name: "Ram Mandir",
//       description: "One of the oldest temples in Janakpur.",
//     },
//     {
//       position: { lat: 26.72911470354643, lng: 85.92804600967762 },
//       name: "Dhanush Sagar",
//       description: "A sacred pond near Janaki Mandir.",
//     },
//     {
//       position: { lat: 26.72990489490625, lng: 85.92927576417682 },
//       name: "Ganga Sagar",
//       description: "A sacred pond near Janaki Mandir.",
//     },
//     {
//       position: { lat: 26.7315797122424, lng: 85.92463704832791 },
//       name: "Ram Janaki Vivaha Mandap",
//       description:
//         "A historical place where Lord Ram and Goddess Sita had their married ",
//     },
//     {
//       position: { lat: 26.653154576118574, lng: 85.79912424087415 },
//       name: "Jaleshwor",
//       description:
//         "Jaleshwar is a municipality in Janakpur Zone, Nepal, and the headquarters of Mahottari district of Madhesh Province in Nepal. It is located in the Terai, on the border with India at Bhitthamore, Bihar, and has a Customs checkpoint. The language most commonly spoken in Jaleshwar ",
//     },
//   ];

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g&callback=initMap`;
//     script.async = true;

//     window.initMap = () => {
//       if (mapRef.current) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: { lat: 26.729006, lng: 85.924764 },
//           zoom: 15,
//         });

//         // Add markers
//         markersData.forEach((markerData) => {
//           const marker = new window.google.maps.Marker({
//             position: markerData.position,
//             map,
//             title: markerData.name,
//           });

//           // Add click event to marker
//           marker.addListener("click", () => {
//             onMarkerClick(markerData);
//           });
//         });

//         // Default behavior when clicking outside any marker
//         map.addListener("click", () => {
//           onMarkerClick(null);
//         });
//       }
//     };

//     document.body.appendChild(script);
//   }, [onMarkerClick]);

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: "100%",
//         height: "100%",
//         border: "2px solid #333",
//         borderRadius: "8px",
//       }}
//     />
//   );
// };

// export default Map;
"use client";
import React, { useRef, useEffect } from "react";

interface MarkerData {
  position: { lat: number; lng: number };
  name: string;
  description: string;
}

// Extend the Window interface to include the google property and initMap function
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  onMarkerClick: (place: MarkerData | null) => void;
}

const Map: React.FC<MapProps> = ({ onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const markersData: MarkerData[] = [
    {
      position: { lat: 26.771017645031975, lng: 85.9234104125973 },
      name: "Janaki Mandir",
      description: "A historic temple dedicated to Sita Devi.",
    },
    {
      position: { lat: 26.730008050564077, lng: 85.92655558692753 },
      name: "Ram Mandir",
      description: "One of the oldest temples in Janakpur.",
    },
    {
      position: { lat: 26.72911470354643, lng: 85.92804600967762 },
      name: "Dhanush Sagar",
      description: "A sacred pond near Janaki Mandir.",
    },
    {
      position: { lat: 26.72990489490625, lng: 85.92927576417682 },
      name: "Ganga Sagar",
      description: "A sacred pond near Janaki Mandir.",
    },
    {
      position: { lat: 26.7315797122424, lng: 85.92463704832791 },
      name: "Ram Janaki Vivaha Mandap",
      description:
        "A historical place where Lord Ram and Goddess Sita had their marriage.",
    },
    {
      position: { lat: 26.653154576118574, lng: 85.79912424087415 },
      name: "Jaleshwor",
      description:
        "A municipality and the headquarters of Mahottari district in Madhesh Province.",
    },
    {
      position: { lat: 26.730884337924547, lng: 85.94147652233809 },
      name: "Hanuman Mandir",
      description: "One of the temple where lord Hanuman is worshipped",
    },
    {
      // 26.7262° N, 85.9251° E
      position: { lat: 25.312256580775333, lng: 85.9251 },
      name: "Sankat Mochan Janakpur",
      description:
        "One of the religious place to visit in Janakpur as well as it also one of the oldest temple in Janakpur along with that many tourists from different places come to worship here.",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhlu48Rgp5oPbgPAV6CTslmRu5S1mI6g&callback=initMap`;
    script.async = true;

    window.initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 26.729006, lng: 85.924764 },
          zoom: 12,
        });

        const bounds = new window.google.maps.LatLngBounds();

        // Add markers and extend bounds
        markersData.forEach((markerData) => {
          const marker = new window.google.maps.Marker({
            position: markerData.position,
            map,
            title: markerData.name,
          });

          // Extend bounds to include the marker's position
          bounds.extend(markerData.position);

          // Add click event to marker
          marker.addListener("click", () => {
            onMarkerClick(markerData);
          });
        });

        // Fit map to bounds
        map.fitBounds(bounds);

        // Default behavior when clicking outside any marker
        map.addListener("click", () => {
          onMarkerClick(null);
        });
      }
    };

    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        border: "2px solid #333",
        borderRadius: "8px",
      }}
    />
  );
};

export default Map;
