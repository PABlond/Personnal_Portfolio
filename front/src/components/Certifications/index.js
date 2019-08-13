import React, { useState } from "react"
import { Carousel, Image, Col } from "react-bootstrap"
import store from "./../../state/store"

export default () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)
  const { certifications = [] } = store.getState().content
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    setDirection(e.direction)
  }
  return (
    <Col md={6} className="pl-0 pr-0">
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect}
          interval={3000}
        >
          {certifications.map((cert, i) => (
            <Carousel.Item key={i}>
              <Image fluid src={cert.thumbnail} alt="test" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Col>
  )
}