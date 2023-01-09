import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Header from "./Header";
import "./HomePage.scss";
import AboutSection from "./Section/About";
import DoctorFacility from "./Section/DoctorFacility";
import Footer from "./Section/Footer";
import HandBook from "./Section/HandBook";
import IntroApp from "./Section/IntroApp";
import MedicalFacility from "./Section/MedicalFacility";
import Specialization from "./Section/Specialization";
class HomePage extends Component {
  render() {
    return (
      <>
        <Header isShowBanner={true}></Header>
        <Specialization></Specialization>
        <MedicalFacility></MedicalFacility>
        <DoctorFacility></DoctorFacility>
        <HandBook></HandBook>
        <AboutSection></AboutSection>
        <IntroApp></IntroApp>
        <Footer></Footer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
