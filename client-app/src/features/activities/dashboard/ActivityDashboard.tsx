import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";


function ActivityDashboard() {

  const {activityStore} = useStore();
  const {loadActivities, activityRegistery} = activityStore;

  useEffect(() => {
    if(activityRegistery.size <= 1)
    {
      activityStore.loadActivities();
    }    
  }, [activityRegistery.size, loadActivities]);


  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"  />

  return (
    /* semantic ui grid systeam has 16 unlike bootstraps 12 */
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
         <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);

// && in here means everything to the right of this && will execute only if what's on the left is true
// so activity details will only load if activities[0] exists/ is true