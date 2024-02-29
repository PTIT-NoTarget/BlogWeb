import { Tab, Nav } from "react-bootstrap";

export default function InformationTab() {
  return (
    <div>
      <Tab.Container id="information-tab" defaultActiveKey="introduce">
        <div className="row">
          <div className="col-2">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="introduce">Introduce</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="personal">Personal</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="security">Security</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="col-10">
            <Tab.Content>
              <Tab.Pane eventKey="introduce">
                List of public blog
              </Tab.Pane>
              <Tab.Pane eventKey="personal">
                List of draft blog
              </Tab.Pane>
              <Tab.Pane eventKey="security">
                List of deleted blog
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}