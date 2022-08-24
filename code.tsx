const { widget } = figma;
const { AutoLayout, Input, Frame, useSyncedState, usePropertyMenu } = widget;

type Columns = {
  names: string[];
  width: number[];
  placeholder: string[];
};

function WpPostTable() {
  const defaultNames = ['page title', 'path', 'template', 'memo'];
  const defaultWidth = [200, 200, 200, 200];
  const tableWidth = defaultWidth.reduce((acc, e) => acc + e);

  const [postName, setPostName] = useSyncedState('postName', '');
  const [columns, setColumns] = useSyncedState<Columns>('colums', {
    placeholder: defaultNames,
    width: defaultWidth,
    names: defaultNames
  });
  const [data, setData] = useSyncedState<string[][]>('data', [
    ['', '', '', ''],
    ['', '', '', '']
  ]);

  const borderColor = '#696969';
  const pageTitleBgColor = '#e0ffff';

  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: 'Add Row',
        propertyName: 'addRow'
      },
      {
        itemType: 'action',
        tooltip: 'Delete Row',
        propertyName: 'deleteLastRow'
      }
    ],
    ({ propertyName }) => {
      if (propertyName === 'addRow') {
        const emptyRow = ['', '', '', ''];
        setData((current) => [...current, emptyRow]);
      } else if (propertyName === 'deleteLastRow') {
        setData((current) => {
          const newData = [...current];
          newData.pop();
          return newData;
        });
      }
    }
  );

  return (
    <AutoLayout
      width={tableWidth}
      direction="vertical"
      verticalAlignItems="center"
      padding={{ vertical: 16 }}
    >
      <Input
        placeholder="table title"
        value={postName}
        width="fill-parent"
        fontSize={32}
        onTextEditEnd={(event) => setPostName(event.characters)}
      />

      <AutoLayout
        width="fill-parent"
        direction="horizontal"
        verticalAlignItems="center"
        fill="#fff"
        padding={{ vertical: 16 }}
      >
        {columns.names.map((name, i) => {
          return (
            <Input
              placeholder={defaultNames[i]}
              value={name}
              width={200}
              fontSize={24}
              onTextEditEnd={(e) => {
                const { names, ...rest } = columns;
                const newNames = [...names];
                newNames[i] = e.characters;
                setColumns({ names: newNames, ...rest });
              }}
            />
          );
        })}
      </AutoLayout>

      <AutoLayout direction="vertical" width="fill-parent">
        {data.map((row, i) => {
          return (
            <AutoLayout
              direction="horizontal"
              fill="#fff"
              padding={{ vertical: 16 }}
            >
              {row.map((cell, j) => {
                return (
                  <Input
                    width={200}
                    value={cell}
                    fontSize={24}
                    onTextEditEnd={(e) => {
                      const newData = [...data];
                      newData[i][j] = e.characters;
                      setData(newData);
                    }}
                  />
                );
              })}
            </AutoLayout>
          );
        })}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(WpPostTable);
