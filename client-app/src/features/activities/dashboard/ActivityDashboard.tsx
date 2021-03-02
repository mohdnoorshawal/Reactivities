import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/api/stores/store";

import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


function ActivityDashboard() {

  const {activityStore} = useStore();
  const {selectedActivity, editMode} = activityStore;

  return (
    /* semantic ui grid systeam has 16 unlike bootstraps 12 */
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails/>)}
        {editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);

// && in here means everything to the right of this && will execute only if what's on the left is true
// so activity details will only load if activities[0] exists/ is true