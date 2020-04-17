/**
 * @Author: maureen
 * @Date:   2019-02-21T07:54:04-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-21T08:08:36-06:00
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Tooltip from "@material-ui/core/Tooltip";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#EBEBEB",
    color: "#455A64"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, columns } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columns.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label + "test"}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
