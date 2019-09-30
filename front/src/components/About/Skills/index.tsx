import React from "react"
import { ForceGraph2D } from "react-force-graph"
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"
import store from "./../../../state/store"
import Certifications from "./../Certifications"
import { ISkill, ISkillTab } from "../../../interfaces/about.interface"

export default () => {
  const props: any = store.getState()
  const { width, height }: { width: number; height: number } = props.nav
  const { skills }: { skills: ISkill[] } = props.content.about
  const tabs: ISkillTab[] = skills.map((skill: ISkill) => {
    const { title, nodes, links } = skill
    return {
      title,
      data: { nodes, links },
    }
  })
  return (
    <Container fluid={true} id="about-bottom" className="pl-0 pr-0">
      <Row style={{ background: "#191919" }}>
        <Col md={6}>
          <Tabs
            defaultActiveKey="Front end"
            className="pl-0 pr-0 text-light"
            id="uncontrolled-tab-example"
          >
            {tabs.map((discipline: ISkillTab, key: number) => {
              return (
                <Tab
                  eventKey={discipline.title}
                  title={discipline.title}
                  key={key}
                >
                  <ForceGraph2D
                    linkWidth={5}
                    linkColor="white"
                    linkOpacity={0}
                    showNavInfo={false}
                    width={width > 768 ? width / 2 : width}
                    height={height / 2 - 50}
                    graphData={discipline.data}
                    nodeAutoColorBy="group"
                    nodeCanvasObject={(
                      node: any,
                      ctx: any,
                      globalScale: number
                    ) => {
                      const label = node.id
                      const fontSize = 15 / globalScale
                      ctx.font = `${fontSize}px Sans-Serif`
                      const textWidth = ctx.measureText(label).width
                      const bckgDimensions = [textWidth, fontSize].map(
                        n => n + fontSize * 0.2
                      ) // some padding
                      ctx.fillStyle = "#191919"
                      ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                      )
                      ctx.textAlign = "center"
                      ctx.textBaseline = "middle"
                      ctx.fillStyle = node.color
                      ctx.fillText(label, node.x, node.y)
                    }}
                    zoom={2}
                    enableNodeDrag={true}
                    backgroundColor="#191919"
                  />
                </Tab>
              )
            })}
          </Tabs>
        </Col>
        <Certifications />
      </Row>
    </Container>
  )
}
