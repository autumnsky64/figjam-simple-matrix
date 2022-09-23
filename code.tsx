const { widget } = figma
const { AutoLayout, Input, Frame, useSyncedState, usePropertyMenu } = widget

type Columns = {
  width: number[]
  names: string[]
}

function SimpleTable() {
  const defaultWidth = [320, 320, 320, 320]

  const [postName, setPostName] = useSyncedState('postName', '')
  const [columns, setColumns] = useSyncedState<Columns>('colums', {
    width: defaultWidth,
    names: ['', '', '', '']
  })
  const tableWidth = 320 * columns.names.length

  const [data, setData] = useSyncedState<string[][]>('data', [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ])

  const borderColor = '#696969'
  const headerColor = '#e0ffff'

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
      },
      {
        itemType: 'action',
        tooltip: 'Add Column',
        propertyName: 'addColumn'
      },
      {
        itemType: 'action',
        tooltip: 'Delete Column',
        propertyName: 'deleteLastColumn'
      }
    ],
    ({ propertyName }) => {
      if (propertyName === 'addRow') {
        const emptyRow = ['', '', '', '']
        setData((current) => [...current, emptyRow])
      } else if (propertyName === 'deleteLastRow') {
        setData((current) => {
          const newData = [...current]
          newData.pop()
          return newData
        })
      } else if (propertyName === 'addColumn') {
        setColumns((current) => {
          const { names, ...rest } = current
          return { names: [...names, ''], ...rest }
        })
        setData((current) => {
          return current.map((row) => [...row, ''])
        })
      } else if (propertyName === 'deleteLastColumn') {
        setColumns((current) => {
          const { names, ...rest } = current
          if (names.length > 1) names.pop()
          return { names: [...names], ...rest }
        })
        setData((current) => {
          if (current.length > 1 && current[0].length > 1) {
            return current.map((row) => {
              if (row.length > 1) row.pop()
              return row
            })
          } else {
            return current
          }
        })
      }
    }
  )

  return (
    <AutoLayout
      width={tableWidth}
      direction="vertical"
      verticalAlignItems="center"
    >
      <AutoLayout width="fill-parent" padding={16}>
        <Input
          placeholder="table title"
          value={postName}
          width="fill-parent"
          fontSize={32}
          onTextEditEnd={(event) => setPostName(event.characters)}
        />
      </AutoLayout>
      <AutoLayout
        width="fill-parent"
        direction="horizontal"
        verticalAlignItems="center"
        fill="#fff"
        stroke={borderColor}
      >
        {columns.names.map((name, i) => {
          return (
            <>
              <AutoLayout width={320} height="fill-parent" padding={16}>
                <Input
                  width={320 - 16 * 2 - 1}
                  value={name}
                  fontSize={24}
                  onTextEditEnd={(e) => {
                    const { names, ...rest } = columns
                    const newNames = [...names]
                    newNames[i] = e.characters
                    setColumns({ names: newNames, ...rest })
                  }}
                />
              </AutoLayout>
              <Frame
                height="fill-parent"
                width={1}
                name="Border2"
                fill={borderColor}
              />
            </>
          )
        })}
      </AutoLayout>

      <AutoLayout direction="vertical" width="fill-parent" stroke={borderColor}>
        {data.map((row, i) => {
          return (
            <>
              <Frame
                height={1}
                width="fill-parent"
                name="Border"
                fill={borderColor}
              />
              <AutoLayout
                direction="horizontal"
                fill="#fff"
                width="fill-parent"
              >
                {row.map((cell, j) => {
                  return (
                    <>
                      <AutoLayout
                        width={320}
                        fill={j > 0 ? '#fff' : headerColor}
                        padding={16}
                      >
                        <Input
                          width={320 - 16 * 2 - 1}
                          value={cell}
                          fontSize={24}
                          onTextEditEnd={(e) => {
                            const newData = [...data]
                            newData[i][j] = e.characters
                            setData(newData)
                          }}
                        />
                      </AutoLayout>
                      <Frame
                        height="fill-parent"
                        width={1}
                        name="Border2"
                        fill={borderColor}
                      />
                    </>
                  )
                })}
              </AutoLayout>
            </>
          )
        })}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(SimpleTable)
