import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"
import { IMdNode, IImageQuery } from "./../interfaces/query.interface"
import { IState } from "./../interfaces/state.interface"
import { dispatchContent } from "./../config/constants"
import Col6Layout from "./../components/Layout/Col6Layout"
import Header from "./../components/Header"
import About from "./../components/About"
import Skills from "./../components/Skills"
import Certifications from "./../components/Certifications"
import Works from "./../components/Works"
import Contact from "./../components/Contact"
import Loading from "./../components/Loading"
import Nav from "./../components/Nav"

const Home = ({ data, dispatchFullContent }: any) => {
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const header = {
      __html: data.allMarkdownRemark.edges
        .map((mod: IMdNode) =>
          mod.node.frontmatter.title == "header" ? mod.node.html : null
        )
        .filter(Boolean)[0],
    }
    const about = {
      __html: data.allMarkdownRemark.edges
        .map((mod: IMdNode) =>
          mod.node.frontmatter.title == "about" ? mod.node.html : null
        )
        .filter(Boolean)[0],
    }
    const works = {
      __html: data.allMarkdownRemark.edges
        .map((mod: IMdNode) => {
          return mod.node.frontmatter.title == "works" ? mod.node.html : null
        })
        .filter(Boolean)[0],
    }

    const formatWorks = works =>
      works.map(work => {
        const title = work.html.split("<h4>")[1].split("</h4>")[0]
        const content = work.html.split("<h6>")[1].split("</h6>")[0]
        const technos = work.html.split("<p>")[2].split("</p>")[0]
        const __html = work.html
        const n = parseInt(work.frontmatter.title.split("-")[1])
        return { title, content, technos, __html, n }
      })

    const work = data.allMarkdownRemark.edges
      .map((mod: IMdNode) => {
        return mod.node.frontmatter.title.indexOf("work-") !== -1
          ? mod.node
          : null
      })
      .filter(Boolean)
    console.log("work", formatWorks(work))
    const certifications = data.allFile.edges.map(
      (certification: IImageQuery) => certification.node.childImageSharp
    )
    dispatchFullContent({ header, about, certifications, works })
    setLoading(false)
  }, [])

  return !loading ? (
    <>
      <Nav />
      <Header />
      <section id="about">
        <About />
        <Col6Layout>
          {typeof window !== "undefined" && <Skills />}
          <Certifications />
        </Col6Layout>
      </section>
      <section id="works">
        <Works />
      </section>
      <section id="contact">
        <Contact hidden={false} />
      </section>
    </>
  ) : (
    <>
      <Loading />
      <Contact hidden={true} />
    </>
  )
}

export const query = graphql`
  query HomeData {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "certifications" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFullContent: (payload: IState) =>
    dispatch({ type: dispatchContent, payload }),
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
