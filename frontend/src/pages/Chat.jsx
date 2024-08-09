import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../comp/Sidebar"
import MessageForm from "../comp/MessageForm"
function Chat() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar/>
        </Col>
        <Col md={8}>
          <MessageForm/>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
