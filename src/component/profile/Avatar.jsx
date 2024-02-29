import { Image } from "react-bootstrap";


export default function Avatar({profile}) {
  
  return (
    <div className="row">
      <div className="col-5">
        <Image src={profile?.avatar} roundedCircle className="img-fluid" />
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
