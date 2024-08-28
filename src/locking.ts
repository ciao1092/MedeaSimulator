const locksByName: Record<string, Promise<any>[]> = {};

export async function doWithLock<T>(
    lockName: string,
    task: () => Promise<T>
): Promise<T> {
    // Ensure array present for the given lock name.
    if (!locksByName[lockName]) {
        locksByName[lockName] = [];
    }

    // Obtain the stack (array) of locks (promises) for the given lock name.
    // The lock at the bottom of the stack (index 0) is for the currently executing task.
    const locks = locksByName[lockName];

    // Determine if this is the first/only task for the given lock name.
    const isFirst = locks.length === 0;

    // Create the lock, which is simply a promise. Obtain the promise's resolve method which
    // we can use to "unlock" the lock, which signals to the next task in line that it can start.

    let unlock = () => {};

    const newLock = new Promise<void>((resolve) => {
        unlock = resolve;
    });

    locks.push(newLock);

    // If this is the first task for a given lock, we can skip this. All other tasks need to wait
    // for the immediately proceeding task to finish executing before continuing.
    if (!isFirst) {
        const predecessorLock = locks[locks.length - 2];
        await predecessorLock;
    }

    // Now that it's our turn, execute the task. We use a finally block here to ensure that we unlock
    // the lock so the next task can start, even if our task throws an error.
    try {
        return await task();
    } catch (error) {
        throw error;
    } finally {
        // Ensure that our lock is removed from the stack.
        locks.splice(0, 1);

        // Invoke unlock to signal to the next waiting task to start.
        unlock();
    }
}
