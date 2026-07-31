import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const QuestionDisplay = ({ question }) => {
  if (!question || !question.questionText) return null;

  return (
    <div className="markdown-content-wrapper" style={{ fontSize: '1.1rem', color: '#2d3748', width: '100%' }}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Table ko premium aur responsive Bootstrap style dena
          table: ({node, ...props}) => (
            <div className="table-responsive my-3 shadow-sm border rounded" style={{ overflowX: 'auto' }}>
              <table className="table table-bordered table-striped table-hover mb-0" {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th className="bg-light text-dark fw-bold text-center p-3" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="text-center p-2 align-middle" {...props} />
          ),
          p: ({node, ...props}) => <p className="mb-2" {...props} />
        }}
      >
        {question.questionText}
      </ReactMarkdown>
    </div>
  );
};

export default QuestionDisplay;