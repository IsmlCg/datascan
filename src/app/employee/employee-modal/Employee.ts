
export interface Employee {
  name: string;
  lastname: string;
  code: string;
  id: string;
  active: boolean;
  job:string;
  days:{
    monday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    tuesday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    wednesday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    thursday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    friday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    saturday:{
      start:string;
      end:string;
      status:string;
      job:string;
    },
    sunday:{
      start:string;
      end:string;
      status:string;
      job:string;
    }
  }
}
