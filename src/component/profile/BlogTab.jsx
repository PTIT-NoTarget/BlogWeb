import { Tab, Nav } from "react-bootstrap";

export default function BlogTab() {
  return (
    <div>
      <Tab.Container id="blog-tab" defaultActiveKey="public">
        <div className="row">
          <div className="col-2">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="public">Public</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="draft">Draft</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="delete">Delete</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="col-10">
            <Tab.Content>
              <Tab.Pane eventKey="public">
                List of public blog
              </Tab.Pane>
              <Tab.Pane eventKey="draft">
                List of draft blog
              </Tab.Pane>
              <Tab.Pane eventKey="delete">
                List of deleted blog
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}
