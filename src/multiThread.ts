import cluster from 'cluster';
import os from 'os';

const CPUS = os.cpus();
if (cluster.isPrimary) {
	CPUS.forEach(function () {
		cluster.fork();
	});
} else {
	require('./server');
}
