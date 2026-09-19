import { Tag, TagProps } from 'antd';
import { memo } from 'react';

import { GITHUB_REPO_URL } from '@/const/url';
import { useAppStore } from '@/store';

const VersionTag = memo<TagProps>((props) => {
  const version = useAppStore((st) => st.version);

  return (
    <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
      <Tag {...props}>v{version}</Tag>
    </a>
  );
});

export default VersionTag;
