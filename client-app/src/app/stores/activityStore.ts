import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from './../models/activity';
import agent from './../api/agent';
import { format } from 'date-fns';

export default class ActivityStore {
  //   title = 'Hello from MobX!';

  activityRegistery = new Map<string, Activity>();

  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  /**
   *
   */
  constructor() {
    // super();

    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action.bound,
    // });
    makeAutoObservable(this);
  }
  get activitiesByDate() {
    return Array.from(this.activityRegistery.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }
  ///// yeki az mohemtarin function haye in course
  get groupedActivities() {
    // returns => [string, Activity[]][]
    return Object.entries(
      // returns => {[key: string]: Activity[];}
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, 'dd MMM yyyy');
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        // activity.date = activity.date.split('T')[0];
        // // this.activities.push(activity);
        // this.activityRegistery.set(activity.id, activity);
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getAtivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = new Date(activity.date!);
    // this.activities.push(activity);
    this.activityRegistery.set(activity.id, activity);
  };
  private getAtivity = (id: string) => {
    return this.activityRegistery.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // selectActivity = (id: string) => {
  //   // this.selectedActivity = this.activities.find((a) => a.id === id);
  //   this.selectedActivity = this.activityRegistery.get(id);
  // };

  // cancelSelectedActivity = () => {
  //   this.selectedActivity = undefined;
  // };
  // openForm = (id?: string) => {
  //   id ? this.selectActivity(id) : this.cancelSelectedActivity();
  //   this.editMode = true;
  // };

  // closeForm = () => {
  //   this.editMode = false;
  // };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        // this.activities.push(activity);
        this.activityRegistery.set(activity.id, activity);

        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        // this.activities = [
        //   ...this.activities.filter((a) => a.id !== activity.id),
        //   activity,
        // ];
        this.activityRegistery.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        // this.activities = [...this.activities.filter((a) => a.id !== id)];
        this.activityRegistery.delete(id);
        // if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  //   setTitle() {
  //     this.title = this.title + '!';
  //   }

  //   setTitle = () => {
  //     this.title = this.title + '!';
  //   };
}