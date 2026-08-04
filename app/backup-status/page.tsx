import type { Metadata } from 'next';
import BackupStatusClient from './BackupStatusClient';

export const metadata: Metadata = {
  title: 'Backup Status',
  description: 'Monitor the health and backup status of WarNodes infrastructure.',
};

export default function BackupStatusPage() {
  return <BackupStatusClient />;
}
