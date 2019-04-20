import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';

const DroppableWrapper = props => (
  <Droppable droppableId={props.droppableId}>
    {provided => (
      <div className={props.className}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.droppablePlaceholder}>
              {props.children}
              {provided.placeholder}
      </div>
    )}
  </Droppable>
);

DroppableWrapper.propTypes = {
    droppableId: PropTypes.any.isRequired,
}

DroppableWrapper.defaultProps = {
}

export default DroppableWrapper;