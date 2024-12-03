export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((job) => {
    const jobInstance = queue.create('push_notification_code_3', job);
    
    jobInstance.save((err) => {
      if (!err) {
        console.log(`Notification job created: ${jobInstance.id}`);
      } else {
        console.error(`Error creating notification job: ${err}`);
      }
    });
  });
}

