import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CollegeCard({ college, compact }) {
  const [ratingInfo, setRatingInfo] = useState({ avg: null, count: 0 });

  useEffect(() => {
    fetch("/src/data/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        const ratings = data.filter(
          (r) => r.collegeName.trim() === college.name.trim()
        );
        if (ratings.length > 0) {
          const avg = (
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          ).toFixed(1);
          setRatingInfo({ avg, count: ratings.length });
        } else {
          setRatingInfo({ avg: null, count: 0 });
        }
      })
      .catch(() => setRatingInfo({ avg: null, count: 0 }));
  }, [college.name]);

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
            ? `${ratingInfo.avg} ⭐ (${ratingInfo.count})`
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
