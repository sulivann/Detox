describe('AVDs resolver', () => {
  let MockListAVDsCommand;
  let emulatorExec;
  let uut;
  beforeEach(() => {
    MockListAVDsCommand = jest.genMockFromModule('../exec/EmulatorExec').ListAVDsCommand;
    jest.mock('../exec/EmulatorExec', () => ({
      ListAVDsCommand: MockListAVDsCommand,
    }));

    emulatorExec = {
      exec: jest.fn().mockResolvedValue(''),
    };

    const AVDsResolver = require('./AVDsResolver');
    uut = new AVDsResolver(emulatorExec);
  });

  it('should exec command', async () => {
    await uut.resolve();
    expect(emulatorExec.exec).toHaveBeenCalledWith(expect.any(MockListAVDsCommand));
  });

  it('should parse emulators list given as text', async () => {
    emulatorExec.exec.mockResolvedValue('avd-device1\navd-device2\n');
    expect(await uut.resolve()).toEqual(['avd-device1', 'avd-device2']);
  });
});
