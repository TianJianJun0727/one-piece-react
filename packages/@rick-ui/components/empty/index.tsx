import { isEmptyValue } from '@rickzhou/react-utils';
import { Spin } from 'antd';
import { type PropsWithChildren } from 'react';
import { FlexCenter } from '../style.base';
import { DescStyles, EmptyBgStyles } from './style';

export type EmptyProps = {
  desc?: string;
  loading?: boolean;
  height?: string;
};

const Empty: React.FC<EmptyProps> & {
  WithEmpty: typeof WithEmpty;
} = ({
  loading = false,
  desc = loading ? 'Loading...' : 'No Results Found',
  height = '100%',
}) => {
  return (
    <Spin spinning={loading}>
      <div css={FlexCenter} style={{ height }}>
        <div css={EmptyBgStyles} />
        <div css={DescStyles}>{desc}</div>
      </div>
    </Spin>
  );
};

type WithEmptyProps = {
  data: any;
  showEmpty?: boolean;
  emptyProps?: EmptyProps;
} & PropsWithChildren;

const WithEmpty: React.FC<WithEmptyProps> = ({
  data,
  children,
  showEmpty = true,
  emptyProps = {},
}) => {
  return (
    <>
      {isEmptyValue(data) ? (
        showEmpty ? (
          <Empty height="40vh" {...emptyProps} />
        ) : null
      ) : (
        children
      )}
    </>
  );
};

Empty.WithEmpty = WithEmpty;

export default Empty;
