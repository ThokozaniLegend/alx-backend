import kue from 'kue';

// CreatePushNotificationsJobs function
function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Process each job in the jobs array
  jobs.forEach((jobData) => {
    // Create a job in the queue 'push_notification_code_3'
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (err) {
          console.log('Notification job failed: ', err);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    // Job events
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    job.on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    });

    job.on('progress', (progress, total) => {
      const percent = Math.floor((progress / total) * 100);
      console.log(`Notification job ${job.id} ${percent}% complete`);
    });
  });
}

export default createPushNotificationsJobs;

