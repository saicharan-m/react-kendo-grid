import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

class App extends React.Component {
    state = { skip: 0, take: 15 };

    numberOfColumns = 1000;
    numberOfRows = 100000;
    columns = (() => {
        const cols = [];
        for (let c = 1; c <= this.numberOfColumns; c++) {
            cols.push(<GridColumn field={'Field-' + c.toString()} width={150} locked={c===1}></GridColumn>);
        }
        return cols;
    })();

    render() {
        return (
            <Grid
                style={{ width: '720px', height: '400px' }}
                columnVirtualization={true}

                scrollable="virtual"
                data={this.getData(this.state.skip, this.state.take)}
                skip={this.state.skip}
                take={this.state.take}
                total={this.numberOfRows}
                onPageChange={this.pageChange}
            >
                {this.columns}
            </Grid>
        );
    }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    getData = (skip, take) => {
        const page = [];
        for (let r = skip + 1; r <= skip + take && r <= this.numberOfRows; r++) {
            const row = {};
            for (let c = 1; c <= this.numberOfColumns; c++) {
                row["Field-" + c] = "R" + r + ":C" + c;
            }
            page.push(row);
        }
        return page;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);
