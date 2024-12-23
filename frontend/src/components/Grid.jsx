import React from 'react';
import PropTypes from "prop-types";
import '../styles/grid.css';

const GridContainer = ({ children, columns = 12, gap = "var(--grid-gap-desktop)", padding = "32px" }) => (
    <div
      className="grid-container"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
        padding: padding,
      }}
    >
      {children}
    </div>
  );
  
  const GridItem = ({ children, span = 1, offset = 0 }) => (
    <div
      className={`grid-column-span-${span}`}
      style={{ gridColumnStart: offset > 0 ? `${offset + 1}` : "auto" }}
    >
      {children}
    </div>
  );
  
  GridContainer.propTypes = {
    children: PropTypes.node.isRequired,
    columns: PropTypes.number,
    gap: PropTypes.string,
    padding: PropTypes.string,
  };
  
  GridItem.propTypes = {
    children: PropTypes.node.isRequired,
    span: PropTypes.number,
    offset: PropTypes.number,
  };
  
  export { GridContainer, GridItem };
  