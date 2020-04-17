/**
 * @Author: maureen
 * @Date:   2019-03-01T16:33:40-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-03-01T18:25:09-06:00
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#EBEBEB",
    color: "#455A64"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class TableHeader extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => {
            return (
              <CustomTableCell
                key={column.id}
                align={column.numeric ? "right" : "left"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
TableHeader.propTypes = {
  order: PropTypes.object.isRequired,
  orderBy: PropTypes.object.isRequired,
  onRequestSort: PropTypes.object.isRequired
};

export default TableHeader;
