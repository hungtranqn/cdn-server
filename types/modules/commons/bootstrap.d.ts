export default boot;
declare let boot: Bootstrap;
declare class Bootstrap {
    /**
     * Init bootstrap
     */
    init(): Promise<Bootstrap>;
    /**
     * Setup paths
     */
    setupPaths(): Promise<void>;
}
