export type Job = {
    id: number;
    title: string;
    location: string;
    phone: string;
    salary: string;
    description?: string;
  };
  
  export type RootStackParamList = {
    JobsList: undefined;
    JobDetail: { job: Job };
     Bookmarks: undefined; 
  };