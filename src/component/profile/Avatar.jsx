import { Image } from "react-bootstrap";

export default function Avatar({ profile }) {
  return (
    <div className="row">
      <div className="col-5">
        <div
          style={{
            position: "relative",
            paddingTop: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={profile?.avatar}
            roundedCircle
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-7 my-auto">
        <h2>{profile?.fullName}</h2>
        <div className="d-flex justify-content-between w-50">
          <div className="text-muted">3 followers</div>
          <div className="text-muted">3 following</div>
        </div>
      </div>
    </div>
  );
}
