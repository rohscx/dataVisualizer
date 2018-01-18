import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import IsRole from './utilities/IsRole';
import Header from './components/Header';
import DataVisualizer from './components/DataVisualizer';


 class App extends Component {
   constructor() {
     super();
     this.state = {
       title: "",
       greeting:"",
       status: ""
     }
   }

   componentWillMount() {

      this.setState({
        title: Meteor.settings.public.siteBranding.navBarBrand
      });
      this.setState({
        greeting: "Welcome, be visualized."
      });
      this.setState({
        status: ""
      });
    }

   // creates a global session
   showAll() {
     if(this.props.showAll) {
       Session.set('showAll', false);
     } else {
       Session.set('showAll', true);
     }

   }

  render() {
    if (!this.props.ready) {
      return <div>Loading Application...</div>
    }
    // inline conditional test. If true the conditional will be displayed
    return (
        <main>
          <Header  {... this.state} />
          <DataVisualizer  {... this.state} />
        </main>
    );
  }
}


export default withTracker(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  return {
    ready: userSub.ready(),
  }
})(App);
