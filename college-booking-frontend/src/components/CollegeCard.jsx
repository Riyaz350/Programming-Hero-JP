import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hook/useAxiosPublic"; // Adjust path as needed

export default function CollegeCard({ college, compact }) {
  const [ratingInfo, setRatingInfo] = useState({ avg: null, count: 0 });
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axiosPublic.post("/reviews/filter", {
          collegeName: college.name,
        });
        const ratings = res.data; 

        if (ratings.length > 0) {
          const avg = (
            ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
            ratings.length
          ).toFixed(1);
          setRatingInfo({ avg, count: ratings.length });
        } else {
          setRatingInfo({ avg: null, count: 0 });
        }
      } catch (error) {
        console.error("Failed to load ratings:", error);
        setRatingInfo({ avg: null, count: 0 });
      }
    };

    fetchRatings();
  }, [college.name, axiosPublic]);

  return (
    <div className="card">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      <div className="mt-3 space-y-1">
        <h3 className="text-lg font-semibold">{college.name}</h3>

        <p className="text-sm text-gray-600">
          Rating:{" "}
          {ratingInfo.avg
            ? `${ratingInfo.avg} ⭐ (${ratingInfo.count} reviews)`
            : "Not yet rated"}
        </p>

        <p className="text-sm text-gray-600">
          Admission: {college.admissionStart} → {college.admissionEnd}
        </p>

        {!compact && (
          <>
            <p className="text-sm">Researches: {college.researchCount}</p>
            <p className="text-sm">Sports: {college.sports.join(", ")}</p>
          </>
        )}

        <Link
          to={`/college/${college.id}`}
          className="btn bg-blue-600 text-white mt-2 inline-block"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
