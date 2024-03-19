export interface TestData {
    xit?: boolean;
    fit?: boolean;
    name?: string;
    expected?: any;
    [key: string]: any
}

export function using(testDataCollection: TestData[]): TestData[] {
    const ret = testDataCollection.filter(t => !t.xit);
    const fits = testDataCollection.filter(t => t.fit);
    if(fits.length) return fits;
    return ret;
}