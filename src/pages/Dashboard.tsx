import React from 'react';
import { 
  Upload, 
  FileAudio, 
  Activity, 
  Shield, 
  BarChart3, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../store';
import AudioUploader from '../components/audio/AudioUploader';

const Dashboard: React.FC = () => {
  const { audioFiles, analysisResults } = useAppStore();

  const stats = [
    {
      title: 'Audio Files',
      value: audioFiles.length.toString(),
      change: '+12%',
      icon: <FileAudio className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Analyses Complete',
      value: analysisResults.length.toString(),
      change: '+23%',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Authenticity Score',
      value: '94.7%',
      change: '+2.1%',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Processing Time',
      value: '2.3s',
      change: '-15%',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const recentAnalyses = [
    {
      id: '1',
      filename: 'interview_recording.wav',
      type: 'Authentication',
      status: 'completed',
      authenticity: 98.5,
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      filename: 'phone_call_evidence.mp3',
      type: 'Noise Reduction',
      status: 'processing',
      authenticity: null,
      timestamp: '5 minutes ago'
    },
    {
      id: '3',
      filename: 'conference_audio.wav',
      type: 'Spectral Analysis',
      status: 'completed',
      authenticity: 87.2,
      timestamp: '1 hour ago'
    }
  ];

  const handleAudioUpload = (file: File) => {
    console.log('Audio file uploaded:', file.name);
  };

  return (
    <div className="p-6 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Audio Forensics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor and analyze audio evidence with professional forensics tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <span className="text-white">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid with Equal Heights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions - Left Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3 flex-1">
              <AudioUploader onUpload={handleAudioUpload} />
              
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-700">
                    Start Authentication
                  </p>
                  <p className="text-xs text-gray-500">
                    Verify audio authenticity
                  </p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-700">
                    Spectral Analysis
                  </p>
                  <p className="text-xs text-gray-500">
                    Analyze frequency patterns
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Show uploaded files below Quick Actions */}
          {audioFiles.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Uploaded Files ({audioFiles.length})
              </h3>
              <div className="space-y-2">
                {audioFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <FileAudio className="w-4 h-4 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Analyses - Right Side */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Analyses
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {analysis.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {analysis.filename}
                    </p>
                    <p className="text-sm text-gray-500">
                      {analysis.type} • {analysis.timestamp}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  {analysis.authenticity && (
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.authenticity > 90 
                          ? 'bg-green-100 text-green-700' 
                          : analysis.authenticity > 70 
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {analysis.authenticity > 90 ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {analysis.authenticity.toFixed(1)}% Authentic
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add some padding at the bottom to match the Quick Actions height */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
