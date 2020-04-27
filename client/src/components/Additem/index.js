import React from 'react';
import { Form, Button} from 'react-bootstrap';
import AppBar from "../AppBar";

function Additem() {
  return (
    <div>
    <AppBar link1="/" text1="Log out"/ >
    <main role="main">

      <section class="jumbotron text-left">
        <div class="container">
          <Form>
            <Form.Group controlId="formSearch">
              <Form.Control type="text" placeholder="Add item" />
              <Form.Text className="text-muted">
                Enter the item name.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">Add to list</Button>
          </Form>
        </div>
      </section>
      </main>
      </div>
      );
}

export default Additem;