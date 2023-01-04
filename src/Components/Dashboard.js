import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Card, Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { eventActions } from "./features/authorize/eventSlice";
import Calender from "./Calender";
const Dashboard = (props) => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const events = useSelector((state) => state.event.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cardHeaderStyle = {
    backgroundColor: "#b4b8bb",
    marginBottom: "10px",
  };

  const handleEditClick = (event_id) => {
    navigate("/edit-event/" + event_id);
    props.setSelectedKeys(["add-event"]);
  };

  const handleDeleteClick = (event_id) => {
    console.log(event_id, "lll");
    events.map(event=>{
      if(parseInt(event.id)===parseInt(event_id)){
        dispatch(eventActions.deleteEvent(event));
      }
    })
   
  };

  return (
    <>
    <h4>Events</h4>
    {console.log(events,"events")}
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {events &&
            events.map((event, i) => {
              
              if (event.user_id === loggedInUser.id) {
                return (
                  <Col span={8} key={i}>
                    <Card
                      title={event.name}
                      bordered={false}
                      style={cardHeaderStyle}
                      extra={
                        <>
                          <Button onClick={() => handleEditClick(event.id)}>
                            Edit
                          </Button>{" "}
                          <Button onClick={() => handleDeleteClick(event.id)}>
                            Delete
                          </Button>
                        </>
                      }
                    >
                      <p>
                        {event.name}'s {event.event_type}
                      </p>
                      <p>{moment(event.event_date).format("DD-MMM-YYYY")}</p>
                    </Card>
                  </Col>
                );
              }
              
            })}

        </Row>
       
        {events && <Calender event={events}/>}
      </div>
    </>
  );
};
export default Dashboard;
